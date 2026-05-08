import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue, off } from 'firebase/database';

// 1. ADDED USERNAME TO THE INTERFACE
interface UserStats {
  username: string;
  balance: number;
  points: number;
  xp: number;
  score: number;
  web_captcha: number;
}

interface UserContextType {
  stats: UserStats;
  addXP: (amount: number) => Promise<void>;
  addPoints: (amount: number) => Promise<void>;
  updateScore: (amount: number) => Promise<void>;
  incrementWebCaptcha: () => Promise<void>;
}

// 2. ADDED DEFAULT USERNAME
const defaultStats: UserStats = {
  username: "User",
  balance: 0,
  points: 0,
  xp: 0,
  score: 100,
  web_captcha: 0
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [stats, setStats] = useState<UserStats>(defaultStats);
  const [uid, setUid] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const db = getDatabase();
    let dbRef: any = null;

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        dbRef = ref(db, `users/${user.uid}`);
        
        onValue(dbRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setStats({
              // 3. SMART FETCH: Checks for 'username' first, then 'name', then falls back to "User"
              username: data.username || data.name || "User",
              balance: typeof data.balance === 'number' ? data.balance : 0,
              points: typeof data.points === 'number' ? data.points : 0,
              xp: typeof data.xp === 'number' ? data.xp : 0,
              score: typeof data.score === 'number' ? data.score : 0,
              web_captcha: typeof data.web_captcha === 'number' ? data.web_captcha : 0,
            });
          }
        });
      } else {
        setUid(null);
        setStats(defaultStats);
      }
    });

    return () => {
      unsubscribe();
      if (dbRef) off(dbRef);
    };
  }, []);

  const callBackendGateway = async (action: string, payload: any = {}) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    try {
      const idToken = await user.getIdToken(true);
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const gatewayUrl = `${supabaseUrl}/functions/v1/security-server`;

      const response = await fetch(gatewayUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({
          target_service: 'main-handler',
          action: action,
          user_id: user.uid,
          ...payload
        })
      });

      if (!response.ok) {
        throw new Error(`Gateway returned ${response.status}`);
      }
    } catch (error) {
      console.error(`[UserContext] Backend API error for ${action}:`, error);
    }
  };

  const addXP = async (amount: number) => {
    await callBackendGateway('update_stats', { stat_type: 'xp', amount: amount });
  };

  const addPoints = async (amount: number) => {
    await callBackendGateway('update_stats', { stat_type: 'points', amount: amount });
  };

  const updateScore = async (amount: number) => {
    await callBackendGateway('update_stats', { stat_type: 'score', amount: amount });
  };

  const incrementWebCaptcha = async () => {
    await callBackendGateway('update_stats', { stat_type: 'web_captcha', amount: 1 });
  };

  return (
    <UserContext.Provider value={{ stats, addXP, addPoints, updateScore, incrementWebCaptcha }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

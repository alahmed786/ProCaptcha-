import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue, off } from 'firebase/database';

interface UserStats {
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

const defaultStats: UserStats = {
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
        
        // We KEEP the real-time listener so the UI instantly animates 
        // when the backend processes the changes.
        onValue(dbRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setStats({
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

  // --- Secure Backend API Helpers ---
  
  // Generic helper to securely route requests through your gateway
  const callBackendGateway = async (action: string, payload: any = {}) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    try {
      // 1. Get the fresh ID token for authentication
      const idToken = await user.getIdToken(true);
      
      // 2. Point to your Supabase security-server
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const gatewayUrl = `${supabaseUrl}/functions/v1/security-server`;

      // 3. Send the secure request
      const response = await fetch(gatewayUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({
          target_service: 'main-handler', // Routing to your main backend logic
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

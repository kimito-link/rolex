"use client";

// アプリ全体の状態（プロフィール＋応募履歴）を扱うフック。
// localStorage を唯一の保存先とし、変更があるたび永続化する。

import { useCallback, useEffect, useState } from "react";
import { newId } from "./id";
import {
  clearAll as clearAllStorage,
  loadApplications,
  loadProfile,
  saveApplications,
  saveProfile,
} from "./storage";
import {
  Application,
  DEFAULT_MODEL_SLOT,
  DEFAULT_STORE,
  EMPTY_PROFILE,
  Profile,
} from "./types";

export function useAppState() {
  const [profile, setProfileState] = useState<Profile>(EMPTY_PROFILE);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loaded, setLoaded] = useState(false);

  // 初回マウント時に localStorage から復元する
  useEffect(() => {
    setProfileState(loadProfile());
    setApplications(loadApplications());
    setLoaded(true);
  }, []);

  // ---- Profile ----

  const updateProfile = useCallback((next: Profile) => {
    setProfileState(next);
    saveProfile(next);
  }, []);

  // ---- Applications ----

  const addApplication = useCallback(
    (partial?: Partial<Application>): Application => {
      const now = Date.now();
      const app: Application = {
        id: newId(),
        store: DEFAULT_STORE,
        url: "",
        visitDate: "",
        visitTime: "",
        modelSlot: DEFAULT_MODEL_SLOT,
        appliedDate: "",
        status: "未応募",
        memo: "",
        createdAt: now,
        updatedAt: now,
        ...partial,
      };
      setApplications((prev) => {
        const next = [app, ...prev];
        saveApplications(next);
        return next;
      });
      return app;
    },
    []
  );

  const updateApplication = useCallback(
    (id: string, patch: Partial<Application>) => {
      setApplications((prev) => {
        const next = prev.map((a) =>
          a.id === id ? { ...a, ...patch, updatedAt: Date.now() } : a
        );
        saveApplications(next);
        return next;
      });
    },
    []
  );

  const deleteApplication = useCallback((id: string) => {
    setApplications((prev) => {
      const next = prev.filter((a) => a.id !== id);
      saveApplications(next);
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    clearAllStorage();
    setProfileState(EMPTY_PROFILE);
    setApplications([]);
  }, []);

  return {
    loaded,
    profile,
    updateProfile,
    applications,
    addApplication,
    updateApplication,
    deleteApplication,
    clearAll,
  };
}

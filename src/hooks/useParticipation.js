import { useState, useCallback } from 'react';
import { participationApi } from '../api/client';

export const useParticipation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkParticipation = useCallback(async (userId, activityId) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await participationApi.checkParticipation(userId, activityId);
      return response.data !== undefined ? response.data : response;
    } catch (err) {
      setError(err.message || 'Failed to check participation');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getParticipationCount = useCallback(async (activityId) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await participationApi.getParticipationCount(activityId);
      return response.data || response || 0;
    } catch (err) {
      setError(err.message || 'Failed to get participation count');
      return 0;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addParticipation = useCallback(async (userId, activityId) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await participationApi.addParticipation({
        userId,
        activityId,
      });
      
      return response.data || response;
    } catch (err) {
      setError(err.message || 'Failed to add participation');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removeParticipation = useCallback(async (userId, activityId) => {
    try {
      setIsLoading(true);
      setError(null);
      
      await participationApi.removeParticipation(userId, activityId);
    } catch (err) {
      setError(err.message || 'Failed to remove participation');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    checkParticipation,
    getParticipationCount,
    addParticipation,
    removeParticipation,
  };
};

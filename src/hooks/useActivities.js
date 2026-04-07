import { useState, useCallback } from 'react';
import { activityApi } from '../api/client';

export const useActivities = () => {
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllActivities = useCallback(async (params = {}) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await activityApi.getAllActivities(params);
      const data = Array.isArray(response) ? response : response.data || [];
      
      setActivities(data);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to fetch activities');
      console.error('Error fetching activities:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getActivityById = useCallback(async (id) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await activityApi.getActivityById(id);
      return response.data || response;
    } catch (err) {
      setError(err.message || 'Failed to fetch activity');
      console.error('Error fetching activity:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createActivity = useCallback(async (activityData) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await activityApi.createActivity(activityData);
      const newActivity = response.data || response;
      
      setActivities([...activities, newActivity]);
      return newActivity;
    } catch (err) {
      setError(err.message || 'Failed to create activity');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [activities]);

  const updateActivity = useCallback(async (id, activityData) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await activityApi.updateActivity(id, activityData);
      const updatedActivity = response.data || response;
      
      setActivities(
        activities.map((activity) =>
          activity.id === id ? updatedActivity : activity
        )
      );
      
      return updatedActivity;
    } catch (err) {
      setError(err.message || 'Failed to update activity');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [activities]);

  const deleteActivity = useCallback(async (id) => {
    try {
      setIsLoading(true);
      setError(null);
      
      await activityApi.deleteActivity(id);
      
      setActivities(activities.filter((activity) => activity.id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete activity');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [activities]);

  const searchActivities = useCallback(async (query) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await activityApi.searchActivities(query);
      const data = Array.isArray(response) ? response : response.data || [];
      
      return data;
    } catch (err) {
      setError(err.message || 'Failed to search activities');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    activities,
    isLoading,
    error,
    fetchAllActivities,
    getActivityById,
    createActivity,
    updateActivity,
    deleteActivity,
    searchActivities,
  };
};

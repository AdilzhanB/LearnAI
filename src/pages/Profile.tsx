import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Calendar, 
  Award, 
  Clock, 
  BarChart3, 
  Edit3, 
  Save,
  UserCheck,
  Briefcase
} from 'lucide-react';
import { db } from '../config/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-hot-toast';

const Profile: React.FC = () => {
  const { userProfile } = useAuth();
  const { progressState } = useProgress();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [profession, setProfession] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userProfile) {
      setDisplayName(userProfile.display_name || '');
      setBio(userProfile.bio || '');
      setProfession(userProfile.profession || '');
    }
  }, [userProfile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userProfile) return;

    setLoading(true);
    try {
      // Only try to update Firestore if we're not using an offline profile
      if (!userProfile.isOfflineProfile) {
        await updateDoc(doc(db, 'users', userProfile.id), {
          display_name: displayName,
          bio: bio,
          profession: profession,
          updated_at: new Date()
        });
      }
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  // Calculate joined date
  const joinedDate = userProfile?.createdAt 
    ? new Date(userProfile.createdAt.seconds ? userProfile.createdAt.seconds * 1000 : userProfile.createdAt).toLocaleDateString()
    : 'Unknown';

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 text-center">
            <p>Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Profile
          </h1>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            {isEditing ? <Save size={18} /> : <Edit3 size={18} />}
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden mb-4">
                {userProfile.photo_url ? (
                  <img 
                    src={userProfile.photo_url} 
                    alt={userProfile.display_name || 'User'} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User size={64} className="text-gray-400" />
                  </div>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={handleSubmit} className="w-full">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Profession
                    </label>
                    <input
                      type="text"
                      value={profession}
                      onChange={(e) => setProfession(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Bio
                    </label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700"
                      rows={4}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save Profile'}
                  </button>
                </form>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {userProfile.display_name || 'User'}
                  </h2>
                  
                  {profession && (
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mt-2">
                      <Briefcase size={16} />
                      <span>{profession}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mt-2">
                    <Mail size={16} />
                    <span>{userProfile.email}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mt-2">
                    <Calendar size={16} />
                    <span>Joined {joinedDate}</span>
                  </div>

                  {bio && (
                    <div className="mt-4 text-gray-700 dark:text-gray-300 text-center">
                      <p>{bio}</p>
                    </div>
                  )}

                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 w-full">
                    <div className="flex justify-between">
                      <div className="text-center">
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Level</p>
                        <p className="font-bold text-xl text-gray-900 dark:text-white">{userProfile.level || 1}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-600 dark:text-gray-400 text-sm">XP</p>
                        <p className="font-bold text-xl text-gray-900 dark:text-white">{userProfile.experience_points || 0}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Rank</p>
                        <p className="font-bold text-xl text-gray-900 dark:text-white">#{userProfile.global_rank || '—'}</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>

          {/* Stats and Progress */}
          <motion.div 
            className="md:col-span-2 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {/* Learning Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Learning Statistics
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <Award className="w-8 h-8 text-primary-500" />
                  </div>
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                    Completed
                  </p>
                  <p className="text-center font-bold text-xl text-gray-900 dark:text-white">
                    {userProfile.algorithms_completed || 0}
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="w-8 h-8 text-primary-500" />
                  </div>
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                    Hours Spent
                  </p>
                  <p className="text-center font-bold text-xl text-gray-900 dark:text-white">
                    {Math.round((userProfile.total_time_spent || 0) / 60)}
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <UserCheck className="w-8 h-8 text-primary-500" />
                  </div>
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                    Current Streak
                  </p>
                  <p className="text-center font-bold text-xl text-gray-900 dark:text-white">
                    {userProfile.current_streak || 0} days
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <BarChart3 className="w-8 h-8 text-primary-500" />
                  </div>
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                    Completion Rate
                  </p>
                  <p className="text-center font-bold text-xl text-gray-900 dark:text-white">
                    {progressState?.analytics?.averageAccuracy?.toFixed(1) || 0}%
                  </p>
                </div>
              </div>
            </div>
            
            {/* Achievements */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Recent Achievements
              </h3>
              
              {(progressState?.achievements?.length > 0) ? (
                <div className="space-y-4">
                  {progressState.achievements.slice(0, 3).map((achievement, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="bg-primary-100 dark:bg-primary-900 rounded-full p-3">
                        <Award className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {achievement.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {achievement.description}
                        </p>
                      </div>
                      <div className="ml-auto text-right">
                        <span className="text-xs bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300 px-2 py-1 rounded-full">
                          +{achievement.points} XP
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 text-center">
                  <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    No achievements yet
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Start learning algorithms to earn achievements!
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

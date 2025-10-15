"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Music, Play, Pause, SkipForward, SkipBack, Volume2, 
  Heart, Download, Share2, Plus, Trash2, Shuffle, Repeat,
  MapPin, Clock, Car, Plane, Train, Ship, Mountain, Sun, Moon
} from "lucide-react";

interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string;
  genre: string;
  mood: string;
  liked: boolean;
  url?: string;
}

interface PlaylistGeneratorProps {
  className?: string;
}

export default function PlaylistGenerator({ className = "" }: PlaylistGeneratorProps) {
  const [playlist, setPlaylist] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [playlistSettings, setPlaylistSettings] = useState({
    mood: "upbeat",
    genre: "pop",
    duration: "2 hours",
    activity: "driving",
    destination: "",
    season: "summer"
  });

  const moods = [
    { id: "upbeat", name: "Upbeat", emoji: "🎉" },
    { id: "chill", name: "Chill", emoji: "😌" },
    { id: "energetic", name: "Energetic", emoji: "⚡" },
    { id: "romantic", name: "Romantic", emoji: "💕" },
    { id: "nostalgic", name: "Nostalgic", emoji: "🌅" },
    { id: "adventurous", name: "Adventurous", emoji: "🗻" }
  ];

  const genres = [
    { id: "pop", name: "Pop" },
    { id: "rock", name: "Rock" },
    { id: "electronic", name: "Electronic" },
    { id: "hip-hop", name: "Hip-Hop" },
    { id: "country", name: "Country" },
    { id: "jazz", name: "Jazz" },
    { id: "classical", name: "Classical" },
    { id: "reggae", name: "Reggae" }
  ];

  const activities = [
    { id: "driving", name: "Driving", icon: Car },
    { id: "flying", name: "Flying", icon: Plane },
    { id: "train", name: "Train Journey", icon: Train },
    { id: "cruise", name: "Cruise", icon: Ship },
    { id: "hiking", name: "Hiking", icon: Mountain },
    { id: "beach", name: "Beach", icon: Sun },
    { id: "city", name: "City Tour", icon: MapPin },
    { id: "night", name: "Night Out", icon: Moon }
  ];

  const durations = ["30 minutes", "1 hour", "2 hours", "4 hours", "8 hours"];

  const mockSongs: Song[] = [
    { id: "1", title: "On The Road Again", artist: "Willie Nelson", duration: "2:35", genre: "country", mood: "upbeat", liked: false },
    { id: "2", title: "Life is a Highway", artist: "Tom Cochrane", duration: "4:26", genre: "rock", mood: "energetic", liked: false },
    { id: "3", title: "I'm Gonna Be (500 Miles)", artist: "The Proclaimers", duration: "3:30", genre: "pop", mood: "upbeat", liked: false },
    { id: "4", title: "Born to Be Wild", artist: "Steppenwolf", duration: "3:30", genre: "rock", mood: "adventurous", liked: false },
    { id: "5", title: "Sweet Home Alabama", artist: "Lynyrd Skynyrd", duration: "4:45", genre: "rock", mood: "nostalgic", liked: false },
    { id: "6", title: "Hotel California", artist: "Eagles", duration: "6:30", genre: "rock", mood: "chill", liked: false },
    { id: "7", title: "Take It Easy", artist: "Eagles", duration: "3:31", genre: "rock", mood: "chill", liked: false },
    { id: "8", title: "Free Bird", artist: "Lynyrd Skynyrd", duration: "9:08", genre: "rock", mood: "adventurous", liked: false },
    { id: "9", title: "Ramblin' Man", artist: "Allman Brothers Band", duration: "4:48", genre: "rock", mood: "upbeat", liked: false },
    { id: "10", title: "The Weight", artist: "The Band", duration: "4:34", genre: "rock", mood: "nostalgic", liked: false }
  ];

  const generatePlaylist = async () => {
    setIsGenerating(true);
    
    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Filter songs based on settings
      let filteredSongs = mockSongs.filter(song => {
        const moodMatch = song.mood === playlistSettings.mood;
        const genreMatch = song.genre === playlistSettings.genre;
        return moodMatch || genreMatch;
      });
      
      // If no exact matches, get songs with similar mood
      if (filteredSongs.length < 5) {
        const moodMap: { [key: string]: string[] } = {
          upbeat: ["energetic", "adventurous"],
          chill: ["nostalgic", "romantic"],
          energetic: ["upbeat", "adventurous"],
          romantic: ["chill", "nostalgic"],
          nostalgic: ["chill", "romantic"],
          adventurous: ["upbeat", "energetic"]
        };
        
        const similarMoods = moodMap[playlistSettings.mood] || [];
        filteredSongs = mockSongs.filter(song => 
          song.mood === playlistSettings.mood || 
          similarMoods.includes(song.mood) ||
          song.genre === playlistSettings.genre
        );
      }
      
      // Shuffle and limit based on duration
      const shuffledSongs = filteredSongs.sort(() => Math.random() - 0.5);
      const durationLimit = playlistSettings.duration === "30 minutes" ? 8 : 
                           playlistSettings.duration === "1 hour" ? 15 :
                           playlistSettings.duration === "2 hours" ? 30 :
                           playlistSettings.duration === "4 hours" ? 60 : 120;
      
      setPlaylist(shuffledSongs.slice(0, Math.min(durationLimit, shuffledSongs.length)));
    } catch (error) {
      console.error("Error generating playlist:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const togglePlayPause = () => {
    if (currentSong) {
      setIsPlaying(!isPlaying);
    } else if (playlist.length > 0) {
      setCurrentSong(playlist[0]);
      setIsPlaying(true);
    }
  };

  const nextSong = () => {
    if (!currentSong) return;
    const currentIndex = playlist.findIndex(song => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % playlist.length;
    setCurrentSong(playlist[nextIndex]);
  };

  const previousSong = () => {
    if (!currentSong) return;
    const currentIndex = playlist.findIndex(song => song.id === currentSong.id);
    const prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
    setCurrentSong(playlist[prevIndex]);
  };

  const toggleLike = (songId: string) => {
    setPlaylist(playlist.map(song => 
      song.id === songId ? { ...song, liked: !song.liked } : song
    ));
  };

  const removeFromPlaylist = (songId: string) => {
    setPlaylist(playlist.filter(song => song.id !== songId));
    if (currentSong?.id === songId) {
      setCurrentSong(null);
      setIsPlaying(false);
    }
  };

  const formatDuration = (duration: string) => {
    return duration;
  };

  const getTotalDuration = () => {
    const totalMinutes = playlist.reduce((total, song) => {
      const [minutes, seconds] = song.duration.split(':').map(Number);
      return total + minutes + seconds / 60;
    }, 0);
    
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gray-100 rounded-xl p-6 ${className}`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
          <Music className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">Travel Playlist Generator</h3>
          <p className="text-gray-600 text-sm">AI-powered music for your journey</p>
        </div>
      </div>

      {/* Playlist Settings */}
      <div className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Create Your Playlist</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mood</label>
            <div className="flex flex-wrap gap-2">
              {moods.map((mood) => (
                <button
                  key={mood.id}
                  onClick={() => setPlaylistSettings({ ...playlistSettings, mood: mood.id })}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
                    playlistSettings.mood === mood.id
                      ? 'border-pink-500 bg-pink-50 text-pink-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <span>{mood.emoji}</span>
                  <span className="text-sm">{mood.name}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Genre</label>
            <select
              value={playlistSettings.genre}
              onChange={(e) => setPlaylistSettings({ ...playlistSettings, genre: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
            >
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>{genre.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
            <select
              value={playlistSettings.duration}
              onChange={(e) => setPlaylistSettings({ ...playlistSettings, duration: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
            >
              {durations.map((duration) => (
                <option key={duration} value={duration}>{duration}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Activity</label>
            <div className="flex flex-wrap gap-2">
              {activities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <button
                    key={activity.id}
                    onClick={() => setPlaylistSettings({ ...playlistSettings, activity: activity.id })}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
                      playlistSettings.activity === activity.id
                        ? 'border-pink-500 bg-pink-50 text-pink-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{activity.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Destination (Optional)</label>
            <input
              type="text"
              value={playlistSettings.destination}
              onChange={(e) => setPlaylistSettings({ ...playlistSettings, destination: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
              placeholder="e.g., California, Paris, Tokyo"
            />
          </div>
        </div>

        <motion.button
          onClick={generatePlaylist}
          disabled={isGenerating}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Music className="w-5 h-5" />
              </motion.div>
              Generating Playlist...
            </>
          ) : (
            <>
              <Music className="w-5 h-5" />
              Generate Playlist
            </>
          )}
        </motion.button>
      </div>

      {/* Now Playing */}
      {currentSong && (
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Now Playing</h4>
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Music className="w-8 h-8 text-white" />
            </div>
            
            <div className="flex-1">
              <h5 className="font-semibold text-gray-800">{currentSong.title}</h5>
              <p className="text-gray-600">{currentSong.artist}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">{currentSong.genre}</span>
                <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">{currentSong.mood}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={previousSong}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <SkipBack className="w-5 h-5" />
              </button>
              <button
                onClick={togglePlayPause}
                className="p-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full hover:shadow-lg transition-all"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              <button
                onClick={nextSong}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Playlist */}
      {playlist.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-800">
              Your Playlist ({playlist.length} songs)
            </h4>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">{getTotalDuration()}</span>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Shuffle className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Repeat className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="space-y-2">
            {playlist.map((song, index) => (
              <motion.div
                key={song.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center gap-4 p-3 rounded-lg border transition-all ${
                  currentSong?.id === song.id 
                    ? 'border-pink-500 bg-pink-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                  {index + 1}
                </div>
                
                <div className="flex-1">
                  <h5 className="font-medium text-gray-800">{song.title}</h5>
                  <p className="text-sm text-gray-600">{song.artist}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">{song.duration}</span>
                  <button
                    onClick={() => toggleLike(song.id)}
                    className={`p-1 rounded transition-colors ${
                      song.liked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${song.liked ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={() => removeFromPlaylist(song.id)}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="flex gap-3 mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
            >
              <Download className="w-4 h-4" />
              Export Playlist
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
            >
              <Share2 className="w-4 h-4" />
              Share Playlist
            </motion.button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
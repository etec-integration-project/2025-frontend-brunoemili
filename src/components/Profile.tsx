import React from 'react';
import { User, Mail, LogOut } from 'lucide-react';

type ProfileProps = {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  onLogout: () => void;
};

export function Profile({ user, onLogout }: ProfileProps) {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="flex flex-col items-center">
          <div className="h-24 w-24 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-24 w-24 rounded-full object-cover"
              />
            ) : (
              <User className="h-12 w-12 text-indigo-600" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{user.name}</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-gray-700">
            <Mail className="h-5 w-5 text-gray-400" />
            <span>{user.email}</span>
          </div>

          <button
            onClick={onLogout}
            className="w-full mt-8 flex items-center justify-center space-x-2 bg-red-50 text-red-600 py-2 px-4 rounded-lg hover:bg-red-100 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
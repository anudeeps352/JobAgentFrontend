import { useState } from 'react';
import { Bell } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

import type { NotificationSetting } from '@/types/settings';

interface Props {
  settings: NotificationSetting[];
}

export default function NotificationSettings({ settings }: Props) {
  const [notifications, setNotifications] = useState(settings);

  const toggleNotification = (id: string, enabled: boolean) => {
    setNotifications((current) =>
      current.map((item) => (item.id === id ? { ...item, enabled } : item)),
    );
  };

  return (
    <Card className="border-zinc-800 bg-zinc-900 p-6">
      <div className="mb-6 flex items-start gap-4">
        <div className="rounded-lg bg-emerald-500/10 p-3">
          <Bell className="h-5 w-5 text-emerald-400" />
        </div>

        <div>
          <h2 className="text-lg font-semibold">Notifications</h2>

          <p className="mt-1 text-sm text-zinc-500">
            Manage how you receive updates.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {notifications.map((notification, index) => (
          <div key={notification.id}>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{notification.title}</p>

                <p className="text-sm text-zinc-500">
                  {notification.description}
                </p>
              </div>

              <Switch
                checked={notification.enabled}
                onCheckedChange={(checked) =>
                  toggleNotification(notification.id, checked)
                }
              />
            </div>

            {index < notifications.length - 1 && (
              <div className="mt-6 border-b border-zinc-800" />
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}

import { useEffect, useState } from 'react';
import { Calendar as CalendarIcon, Users } from 'lucide-react-native';
import AppHeader from '../../src/components/AppHeader';
import EventCard from '../../src/components/EventCard';
import { Card } from '../../src/components/ui/card';
import { Badge } from '../../src/components/ui/badge';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { API_URL } from '../../src/config/api';

interface CalendarDay {
  day: string;
  date: number;
  hasEvent: boolean;
}

interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  attendees: number;
}

export default function Events() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  const upcomingDays: CalendarDay[] = [
    { day: 'Lun', date: 4, hasEvent: false },
    { day: 'Mar', date: 5, hasEvent: true },
    { day: 'Mié', date: 6, hasEvent: false },
    { day: 'Jue', date: 7, hasEvent: true },
    { day: 'Vie', date: 8, hasEvent: false },
    { day: 'Sáb', date: 9, hasEvent: false },
    { day: 'Dom', date: 10, hasEvent: false },
  ];

  useEffect(() => {
    fetch(`${API_URL}/api/events`)
      .then(res => res.json())
      .then(data => {
        setEvents(data);
        setLoading(false);
      })
      .catch(error => {
        console.log('Error cargando eventos:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#4caf50" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppHeader title="Eventos Ambientales" showBack />

      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.calendarCard}>
          <View style={styles.calendarHeader}>
            <CalendarIcon size={20} color="#4caf50" />
            <Text style={styles.calendarTitle}>Noviembre 2025</Text>
          </View>

          <View style={styles.calendarGrid}>
            {upcomingDays.map((day) => (
              <View
                key={day.date}
                style={[
                  styles.calendarDay,
                  day.hasEvent && styles.calendarDayActive,
                ]}
              >
                <Text
                  style={[
                    styles.dayAbbr,
                    day.hasEvent && styles.dayTextActive,
                  ]}
                >
                  {day.day}
                </Text>

                <Text
                  style={[
                    styles.dayNumber,
                    day.hasEvent && styles.dayTextActive,
                  ]}
                >
                  {day.date}
                </Text>

                {day.hasEvent && <View style={styles.eventDot} />}
              </View>
            ))}
          </View>
        </Card>

        <View>
          <View style={styles.eventsHeader}>
            <Text style={styles.eventsTitle}>Próximos Eventos</Text>
            <Badge variant="secondary">
              {events.length} eventos
            </Badge>
          </View>

          {events.map((event) => (
            <View key={event.id} style={styles.eventWrapper}>
              <EventCard
                title={event.title}
                date={event.date}
                location={event.location}
                description={event.description}
              />

              <View style={styles.attendees}>
                <Users size={16} color="#4caf50" />
                <Text style={styles.attendeesText}>
                  {event.attendees} personas confirmadas
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
  },
  calendarCard: {
    padding: 18,
    borderRadius: 16,
    marginBottom: 24,
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1b5e20',
    marginLeft: 8,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  calendarDay: {
    width: 40,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#e8f5e9',
    marginBottom: 8,
  },
  calendarDayActive: {
    backgroundColor: '#4caf50',
  },
  dayAbbr: {
    fontSize: 12,
    fontWeight: '500',
    color: '#2e7d32',
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1b5e20',
  },
  dayTextActive: {
    color: '#ffffff',
  },
  eventDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ffffff',
    marginTop: 4,
  },
  eventsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  eventsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1b5e20',
  },
  eventWrapper: {
    marginBottom: 20,
  },
  attendees: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginLeft: 12,
  },
  attendeesText: {
    fontSize: 12,
    color: '#374151',
    marginLeft: 6,
  },
});
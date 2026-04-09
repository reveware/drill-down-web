import { WireActor, WireParticipant, Participant } from '@/types/chat';

/** Derive display name from a WireActor's typed sub-objects. */
export const getActorDisplayName = (actor: WireActor): string => {
  if (actor.persona) return actor.persona.name;
  if (actor.user) {
    const full = `${actor.user.first_name} ${actor.user.last_name}`.trim();
    return full || actor.user.username;
  }
  return 'Unknown';
};

/** Derive avatar URL from a WireActor's typed sub-objects. */
export const getActorAvatar = (actor: WireActor): string | undefined => {
  return actor.persona?.avatar ?? actor.user?.avatar;
};

/** Convert a WireParticipant (or WireActor) to the UI Participant type. */
export const toParticipant = (wp: WireParticipant): Participant => ({
  id: wp.actor_id,
  name: getActorDisplayName(wp),
  avatar: getActorAvatar(wp),
  is_agent: wp.actor_type === 'PERSONA',
  last_read_seq: wp.last_read_seq,
  user: wp.user ? { id: wp.user.id, username: wp.user.username } : undefined,
  persona: wp.persona ? { id: wp.persona.id, slug: wp.persona.slug } : undefined,
});

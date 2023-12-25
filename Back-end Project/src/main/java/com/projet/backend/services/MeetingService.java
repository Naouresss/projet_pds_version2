package com.projet.backend.services;

import com.projet.backend.models.Meeting;
import com.projet.backend.models.MeetingParticipant;
import com.projet.backend.models.User;
import com.projet.backend.repo.IMeetingRepository;
import com.projet.backend.repo.MeetingRepository;
import com.projet.backend.repo.UserCrud;
import com.projet.backend.repo.UserRepository;
import com.projet.backend.user.UserRole;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

// MeetingService
@Service
public class MeetingService implements IMeetingRepository {
    @Autowired
    private MeetingRepository meetingRepository;

    @Autowired
    private UserRepository userRepository;



    @Override
    public List<Meeting> getAllMeetings() {
        return meetingRepository.findAll().stream().map(u -> new Meeting(u.getId(), u.getSujet(), u.getDateHeure(), u.getTitre(), u.getOrganizer(), u.getParticipants())).toList();
    }



    @Override
    public Meeting getMeetingById(UUID id) {
        return meetingRepository.findById(id).orElse(null);
    }

    /*@Override
    public Meeting addMeeting(Meeting meeting) {
        return meetingRepository.save(meeting);
    }*/
   /* @Override
    public Meeting addMeeting(Meeting meeting) {
        // Récupérer l'utilisateur à partir de l'ID de l'organisateur
        User organizer = userRepository.findById(meeting.getOrganizer().getId()).orElse(null);

        if (organizer != null) {
            // Assigner l'organisateur récupéré à la réunion
            meeting.setOrganizer(organizer);

            // Sauvegarder la réunion
            return meetingRepository.save(meeting);
        } else {
            // Gérer le cas où l'organisateur n'est pas trouvé
            // Vous pouvez choisir de lever une exception, loguer un avertissement, etc.
            return null;
        }
    }*/
    @Override
    @Transactional  // Add this annotation to ensure atomic transaction
    public Meeting addMeeting(Meeting meeting, List<MeetingParticipant> participants) {
        // Récupérer l'utilisateur à partir de l'ID de l'organisateur
        User organizer = meeting.getOrganizer();

        if (organizer != null) {
            // Assigner l'organisateur récupéré à la réunion
            UUID organizerId = organizer.getId();
            meeting.setOrganizer(organizer);

            // Sauvegarder la réunion
            Meeting savedMeeting = meetingRepository.save(meeting);

            // Vérifier et persister chaque participant
            for (MeetingParticipant participant : participants) {
                User existingUser = userRepository.findById(participant.getParticipant().getId()).orElse(null);
                if (existingUser == null) {
                    // L'utilisateur n'existe pas, vous devez le persister
                    userRepository.save(participant.getParticipant());
                }

                // Assigner la réunion au participant
                participant.setMeeting(savedMeeting);
            }

            // Ajouter tous les participants à la réunion
            savedMeeting.getMeetingParticipants().addAll(participants);

            // Enregistrer à nouveau la réunion avec les participants mis à jour
            return meetingRepository.save(savedMeeting);
        } else {
            // Gérer le cas où l'organisateur n'est pas trouvé
            // Vous pouvez choisir de lever une exception, loguer un avertissement, etc.
            throw new RuntimeException("Organizer not found");
        }
    }

    @Override
    public void deleteMeeting(UUID id) {
        meetingRepository.deleteById(id);
    }
    @Override
    public boolean updateMeeting(UUID id, Meeting updatedMeeting) {
        try {
            Meeting existingMeeting = meetingRepository.findById(id).orElse(null);

            if (existingMeeting != null) {
                if (updatedMeeting.getSujet() != null) {
                    existingMeeting.setSujet(updatedMeeting.getSujet());
                }
                if (updatedMeeting.getTitre() != null) {
                    existingMeeting.setTitre(updatedMeeting.getTitre());
                }
                if (updatedMeeting.getDateHeure() != null) {
                    existingMeeting.setDateHeure(updatedMeeting.getDateHeure());
                }

                // Mettez à jour la liste des participants de la réunion
                if (updatedMeeting.getParticipants() != null) {
                    Set<MeetingParticipant> updatedParticipants = new HashSet<>(updatedMeeting.getParticipants());

                    // Assurez-vous que la réunion est correctement associée à chaque participant
                    for (MeetingParticipant participant : updatedParticipants) {
                        participant.setMeeting(existingMeeting);
                    }

                    // Mettez à jour la liste des participants de la réunion
                    existingMeeting.getMeetingParticipants().clear();
                    existingMeeting.getMeetingParticipants().addAll(new ArrayList<>(updatedParticipants));
                }

                // Ajoutez d'autres champs à mettre à jour si nécessaire

                // Sauvegardez la réunion mise à jour
                meetingRepository.save(existingMeeting);

                return true;
            } else {
                return false;
            }
        } catch (Exception exception) {
            // Loguez l'exception pour le débogage
            exception.printStackTrace();
            return false;
        }
    }


    /*@Override
    @Transactional
    public ResponseEntity<Meeting> updateMeeting(UUID id, Meeting updatedMeeting) {
        try {
            Meeting existingMeeting = meetingRepository.findById(id).orElse(null);

            if (existingMeeting != null) {
                if (updatedMeeting.getSujet() != null) {
                    existingMeeting.setSujet(updatedMeeting.getSujet());
                }
                if (updatedMeeting.getTitre() != null) {
                    existingMeeting.setTitre(updatedMeeting.getTitre());
                }
                if (updatedMeeting.getDateHeure() != null) {
                    existingMeeting.setDateHeure(updatedMeeting.getDateHeure());
                }
                if (updatedMeeting.getParticipants() != null) {
                    // Mettez à jour les participants de manière appropriée
                    Set<MeetingParticipant> updatedParticipants = new HashSet<>(updatedMeeting.getParticipants());

                    // Assurez-vous que la réunion est correctement associée à chaque participant
                    for (MeetingParticipant participant : updatedParticipants) {
                        participant.setMeeting(existingMeeting);
                    }

                    // Mettez à jour la liste des participants de la réunion
                    existingMeeting.setMeetingParticipants(updatedParticipants);
                }

                // Ajoutez d'autres champs à mettre à jour si nécessaire

                // Sauvegardez la réunion mise à jour
                meetingRepository.save(existingMeeting);

                return ResponseEntity.ok(existingMeeting);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception exception) {
            // Loguez l'exception pour le débogage
            exception.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

*/

    @Override
    public List<User> getUsersWithRoleInvite() {
        // Implement this method if needed
        return null;

    }
    public List<Meeting> getMeetingsByOrganizerId(UUID organizerId) {
        return meetingRepository.findByOrganizerId(organizerId);
    }
}


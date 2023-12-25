package com.projet.backend.repo;

import com.projet.backend.models.Meeting;
import com.projet.backend.models.MeetingParticipant;
import com.projet.backend.models.User;
import com.projet.backend.user.UserRole;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;
import java.util.UUID;

// IMeetingRepository
public interface IMeetingRepository {
    List<Meeting> getAllMeetings() throws Exception;

    Meeting getMeetingById(UUID id) throws Exception;

   // Meeting addMeeting(Meeting meeting) throws Exception;
   Meeting addMeeting(Meeting meeting, List<MeetingParticipant> participants) ;
   void deleteMeeting(UUID id) throws Exception;

    boolean updateMeeting(UUID id, Meeting updatedMeeting);
    List<User> getUsersWithRoleInvite();

    //void updateRoleInMeeting(UUID userId, UserRole newRole) throws Exception;
}


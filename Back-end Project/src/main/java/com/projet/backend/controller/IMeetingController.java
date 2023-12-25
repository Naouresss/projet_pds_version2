package com.projet.backend.controller;

import com.projet.backend.models.Meeting;
import com.projet.backend.models.MeetingWithParticipantsRequest;
import com.projet.backend.user.UserRole;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.UUID;

public interface IMeetingController {
    //ResponseEntity<List<Meeting>>getAllMeetings() throws Exception;

    ResponseEntity<List<Meeting>> loadAllMeetings() throws Exception;

    ResponseEntity<Meeting> getMeetingById(UUID id);

    //ResponseEntity<Meeting> addMeeting(Meeting meeting);
    ResponseEntity<?> addMeetingWithParticipants(@RequestBody MeetingWithParticipantsRequest request);
    ResponseEntity<String> deleteMeeting(UUID id);

    ResponseEntity<Meeting> updateMeeting(UUID id, Meeting updatedMeeting);

   // ResponseEntity<String> updateRoleInMeeting(UUID userId, UserRole newRole);
}

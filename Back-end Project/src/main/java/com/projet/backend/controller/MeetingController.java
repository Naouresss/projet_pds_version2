package com.projet.backend.controller;

import com.projet.backend.models.Meeting;
import com.projet.backend.models.MeetingParticipant;
import com.projet.backend.models.MeetingWithParticipantsRequest;
import com.projet.backend.models.User;
import com.projet.backend.services.MeetingService;
import com.projet.backend.user.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/meetings")
public class MeetingController implements IMeetingController {
    @Autowired
    private MeetingService meetingService;

    @GetMapping
    public ResponseEntity<List<Meeting>> loadAllMeetings() {
        try {
            List<Meeting> meetings = meetingService.getAllMeetings();
            return new ResponseEntity<>(meetings, HttpStatus.OK);
        } catch (Exception exception) {
            // Log the exception for debugging purposes
            exception.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Meeting> getMeetingById(@PathVariable UUID id) {
        try {
            Meeting meeting = meetingService.getMeetingById(id);
            return meeting != null ? ResponseEntity.ok(meeting) : ResponseEntity.notFound().build();
        } catch (Exception exception) {
            // Log the exception for debugging purposes
            exception.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping
    public ResponseEntity<?> addMeetingWithParticipants(@RequestBody MeetingWithParticipantsRequest request) {
        Meeting meeting = request.getMeeting();
        List<MeetingParticipant> participants = request.getParticipants();

        Meeting addedMeeting = meetingService.addMeeting(meeting, participants);

        if (addedMeeting != null) {
            return new ResponseEntity<>(addedMeeting, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("Unable to add meeting", HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMeeting(@PathVariable UUID id) {
        try {
            meetingService.deleteMeeting(id);
            return ResponseEntity.ok("Meeting deleted successfully");
        } catch (Exception exception) {
            // Log the exception for debugging purposes
            exception.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Meeting> updateMeeting(@PathVariable UUID id, @RequestBody Meeting updatedMeeting) {
        try {
            Boolean meetingUpdated = meetingService.updateMeeting(id, updatedMeeting);

            if (meetingUpdated != null && meetingUpdated) {
                return ResponseEntity.ok(updatedMeeting);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception exception) {
            // Log the exception for debugging purposes
            exception.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /*@PatchMapping("/{userId}/update-role")
    public ResponseEntity<String> updateRoleInMeeting(@PathVariable UUID userId, @RequestParam UserRole newRole) {
        try {
            meetingService.updateRoleInMeeting(userId, newRole);
            return ResponseEntity.ok("Role updated successfully");
        } catch (Exception exception) {
            // Log the exception for debugging purposes
            exception.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }*/
    @GetMapping("/organizer")
    public List<Meeting> getMeetingsByOrganizer(@RequestParam UUID organizerId) {
        return meetingService.getMeetingsByOrganizerId(organizerId);
    }
}

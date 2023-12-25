package com.projet.backend.models;

import java.util.List;

public class MeetingWithParticipantsRequest {

    private Meeting meeting;
    private List<MeetingParticipant> participants;

    public MeetingWithParticipantsRequest(Meeting meeting, List<MeetingParticipant> participants) {
        this.meeting = meeting;
        this.participants = participants;
    }

    public void setMeeting(Meeting meeting) {
        this.meeting = meeting;
    }

    public void setParticipants(List<MeetingParticipant> participants) {
        this.participants = participants;
    }

    public Meeting getMeeting() {
        return meeting;
    }

    public List<MeetingParticipant> getParticipants() {
        return participants;
    }
// Getters and setters
}

package com.projet.backend.models;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.projet.backend.models.Meeting;
import com.projet.backend.models.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class MeetingParticipant {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "meeting_id")
    @JsonIgnoreProperties("meetings")
    private Meeting meeting;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties("users")
    private User participant;


    @Column(nullable = false)
    private String role;


}

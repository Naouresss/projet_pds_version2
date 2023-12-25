package com.projet.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.*;

@Entity

@NoArgsConstructor
@Getter
@Setter
public class Meeting {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(nullable = false)
    private String sujet;
    @Column(nullable = false)
    private Date dateHeure;
    @Column(nullable = false)
    private String titre;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "organizer_id")
    @JsonIgnoreProperties("meetings")
    private User organizer;


    @OneToMany(mappedBy = "meeting", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("meetings")
    private Set<MeetingParticipant> meetingParticipants = new HashSet<>();




    public Meeting(UUID id, String sujet, Date dateHeure, String titre, User organizer, Set<MeetingParticipant> participants) {
        this.id = id;
        this.sujet = sujet;
        this.dateHeure = dateHeure;
        this.titre = titre;
        this.organizer = organizer;
        this.meetingParticipants = participants;
    }

    // Getters et setters

    public UUID getId() {
        return id;
    }

    public String getSujet() {
        return sujet;
    }

    public Date getDateHeure() {
        return dateHeure;
    }

    public String getTitre() {
        return titre;
    }

    public User getOrganizer() {
        return organizer;
    }

    public Set<MeetingParticipant> getParticipants() {
        return meetingParticipants;
    }



    public void setId(UUID id) {
        this.id = id;
    }

    public void setSujet(String sujet) {
        this.sujet = sujet;
    }

    public void setDateHeure(Date dateHeure) {
        this.dateHeure = dateHeure;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public void setOrganizer(User organizer) {
        this.organizer = organizer;
    }

    public void setParticipants(Set<MeetingParticipant> participants) {
        this.meetingParticipants = participants;
    }

    public Meeting(UUID id, String sujet, Date dateHeure, String titre, User organizer) {
        this.id = id;
        this.sujet = sujet;
        this.dateHeure = dateHeure;
        this.titre = titre;
        this.organizer = organizer;
    }
}

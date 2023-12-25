package com.projet.backend.repo;

import com.projet.backend.models.Meeting;
import com.projet.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MeetingRepository extends JpaRepository<Meeting, UUID> {
    //List<Meeting> findByParticipantsContaining(User user);
    List<Meeting> findByOrganizerId(UUID organizerId);
    /*@Query(value = "SELECT * FROM Meeting", nativeQuery = true)
    List<Meeting> getAllMeeting();*/
}

package com.ssafy.backend.repository;

import com.ssafy.backend.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    @EntityGraph(attributePaths = "authorities")
    Optional<User> findOneWithAuthoritiesByUserEmail(String userEmail);

    User findUserByUserEmail(String userEmail);

    User findUserByUserId(Long pk);

    boolean existsByUserEmail(String email);

}
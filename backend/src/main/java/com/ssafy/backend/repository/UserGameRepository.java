package com.ssafy.backend.repository;

import com.ssafy.backend.entity.UserGame;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserGameRepository extends JpaRepository<UserGame, String> {
    @Query(value = "SELECT distinct userGame from UserGame userGame " +
            "left join userGame.game " +
            "where userGame.user.userId = :id " +
            "order by userGame.game.gameYear desc, userGame.game.gameMonth desc, userGame.game.gameDay desc ")
    List<UserGame> getMyRecentFiveGame(Pageable pageable, @Param(value="id") Long id);


}

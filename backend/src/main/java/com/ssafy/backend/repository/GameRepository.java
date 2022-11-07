package com.ssafy.backend.repository;

import com.ssafy.backend.entity.Game;
import com.ssafy.backend.mapper.GameMapper;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GameRepository extends JpaRepository<Game, String> {
    @Query(value = "select new com.ssafy.backend.entity.Game(g.gameId, g.gameYear, g.gameMonth, g.gameDay, g.gameTime) from Game g " +
            "left join UserGame ug " +
            "on g.gameId = ug.game.gameId " +
            "left join User u " +
            "on u.userId = ug.user.userId " +
            "where u.userEmail = :userEmail")
    List<GameMapper> getUserGames(Pageable pageable, @Param(value="userEmail") String userEmail);

}

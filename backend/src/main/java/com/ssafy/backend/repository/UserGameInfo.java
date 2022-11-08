package com.ssafy.backend.repository;

import com.ssafy.backend.entity.UserGame;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserGameInfo extends JpaRepository<UserGame, String>,UserGameCustomRepository {
    @Query(value = "SELECT distinct userGame from UserGame userGame " +
            "left join userGame.game " +
            "where userGame.user.userId = :id " +
            "order by userGame.game.gameYear desc, userGame.game.gameMonth desc, userGame.game.gameDay desc ")
    List<UserGame> getMyGameInfo(Pageable pageable, @Param(value="id") Long id);



//    @Query(value = "SELECT  * FROM  usergame " +
//            "left join fetch user"+
//            "left join fetch game"+
//            " where user_id = :uId and game_id = :gId"
//            ,nativeQuery = true
//    )
//    UserGame getUserGameInfo(@Param(value="uId") Long uId, @Param(value = "gId") Long gId);



}

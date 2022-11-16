package com.ssafy.backend.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.dto.UserGameDto;
import com.ssafy.backend.entity.QGame;
import com.ssafy.backend.entity.QUserGame;
import com.ssafy.backend.entity.UserGame;

import javax.persistence.Column;
import java.util.List;

public class UserGameCustomRepositoryImpl implements UserGameCustomRepository{
    private final JPAQueryFactory jpaQueryFactory;

    public UserGameCustomRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }
    @Override
    public UserGameDto getUserGameInfo(Long userId, Long gameId) {
        QUserGame qUserGame = new QUserGame("userGame");
//        QUserGame qUserGame = QUserGame.userGame;
        return jpaQueryFactory.select(Projections.constructor(UserGameDto.class,
                        qUserGame.usergameId,
                        qUserGame.userAttack,
                        qUserGame.userDefence,
                        qUserGame.userDistance,
                        qUserGame.userGoal,
                        qUserGame.userHeart,
                        qUserGame.userHeatmap,
                        qUserGame.userMaxSpeed,
                        qUserGame.userPass,
                        qUserGame.userPosition,
                        qUserGame.userSave,
                        qUserGame.userSpeed,
                        qUserGame.userSprint,
                        qUserGame.userStamina,
                        qUserGame.userPhysical))
                .from(qUserGame)
                .where(qUserGame.user.userId.eq(userId).and(qUserGame.game.gameId.eq(gameId))).fetchOne();
    }

    @Override
    public List<UserGameDto> getMyGameInfo(Integer start, Integer end, Long id) {
        QUserGame qUserGame = new QUserGame("userGame");
        QGame qGame = new QGame("game");
        return jpaQueryFactory.select(Projections.constructor(UserGameDto.class,
                        qUserGame.usergameId,
                        qUserGame.userAttack,
                        qUserGame.userDefence,
                        qUserGame.userDistance,
                        qUserGame.userGoal,
                        qUserGame.userHeart,
                        qUserGame.userHeatmap,
                        qUserGame.userMaxSpeed,
                        qUserGame.userPass,
                        qUserGame.userPosition,
                        qUserGame.userSave,
                        qUserGame.userSpeed,
                        qUserGame.userSprint,
                        qUserGame.userStamina,
                        qUserGame.userPhysical))
                .from(qUserGame)
                .leftJoin(qGame)
                .on(qUserGame.game.gameId.eq(qGame.gameId))
                .where(qUserGame.user.userId.eq(id))
                .orderBy(qGame.gameYear.desc(),qGame.gameMonth.desc(),qGame.gameDay.desc()).fetch();
    }
}

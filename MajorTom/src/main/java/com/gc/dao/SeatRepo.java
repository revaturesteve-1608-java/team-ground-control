package com.gc.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gc.model.Seat;

@Repository
public interface SeatRepo extends JpaRepository<Seat, Integer> {

}

package com.gc.dto;

public class ReassignSeatDTO {

	private int ticketId;
	private int seatId;
	private int loginToken;
	
	public ReassignSeatDTO() {}

	public ReassignSeatDTO(int ticketId, int seatId, int loginToken) {
		super();
		this.ticketId = ticketId;
		this.seatId = seatId;
		this.loginToken = loginToken;
	}

	public int getTicketId() {
		return ticketId;
	}

	public void setTicketId(int ticketId) {
		this.ticketId = ticketId;
	}

	public int getSeatId() {
		return seatId;
	}

	public void setSeatId(int seatId) {
		this.seatId = seatId;
	}

	public int getLoginToken() {
		return loginToken;
	}

	public void setLoginToken(int loginToken) {
		this.loginToken = loginToken;
	}

	@Override
	public String toString() {
		return "ReassignSeatDTO [ticketId=" + ticketId + ", seatId=" + seatId + ", loginToken=" + loginToken + "]";
	}
	
}
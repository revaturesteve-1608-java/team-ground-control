package com.gc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.gc.service.DataService;

@Controller
public class TestController {
	
	@Autowired
	DataService dataService;
	
	@RequestMapping(value="testSave")
	public String TestSave() {
		System.out.println(dataService.findAirlineByName("Air Estonia"));
		//dataService.saveFlight(new Flight());
		return "/TestPage.html";
	}
}

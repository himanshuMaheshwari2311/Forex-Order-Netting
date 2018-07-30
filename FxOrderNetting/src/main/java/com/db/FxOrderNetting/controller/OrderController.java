package com.db.FxOrderNetting.controller;

import com.db.FxOrderNetting.model.Orders;
import com.db.FxOrderNetting.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/orders")
public class OrderController {

    @Autowired
    OrderService orderService;

    @RequestMapping(value = "/addNew")
    public String placeNewOrder(@RequestBody Orders order){
        System.out.println(order);
        if(orderService.placeNewOrder(order))
            return "Order placed successfully";
        else
            return "Failure in placing order";
    }

    @RequestMapping(value = "/getAllOrders")
    public List<Orders> getAll(){
        return orderService.getAllOrders();
    }

    @RequestMapping(value = "/getAllTrade")
    public List<Orders> getAllTrades(){
        return orderService.getAllTrades();
    }
}

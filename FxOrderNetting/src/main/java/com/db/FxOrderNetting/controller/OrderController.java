package com.db.FxOrderNetting.controller;

import com.db.FxOrderNetting.model.Orders;
import com.db.FxOrderNetting.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@CrossOrigin(allowedHeaders = {"Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"}, methods = {RequestMethod.POST, RequestMethod.GET, RequestMethod.PUT, RequestMethod.DELETE})
@RestController
@RequestMapping(value = "/orders")
public class OrderController {

    @Autowired
    OrderService orderService;

    @RequestMapping(value = "/addNew")
    public String placeNewOrder(@RequestBody Orders order){
        order.setTradeDate(new Date());
        orderService.setValueDate(order);
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

    @RequestMapping(value= "/setValueDate")
    public void setValueDate(){
        orderService.setValueDateOfAllOrders();
    }
}

package com.db.FxOrderNetting.model;

import java.util.Date;

public class Orders {
    public int orderId;
    public int clientId;
    public int ccyId;
    public long baseNotional;
    public Float quoteCurrency;
    public String direction;
    public float price;
    public int tradeTypeId;
    public Date tradeDate;
    public Date createdAt;
    public Date modifiedAt;
    public Date cancelledAt;
    public Date deletedAt;
    public Date valueDate;

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public int getClientId() {
        return clientId;
    }

    public void setClientId(int clientId) {
        this.clientId = clientId;
    }

    public int getCcyId() {
        return ccyId;
    }

    public void setCcyId(int ccyId) {
        this.ccyId = ccyId;
    }

    public long getBaseNotional() {
        return baseNotional;
    }

    public void setBaseNotional(long baseNotional) {
        this.baseNotional = baseNotional;
    }

    public String getDirection() {
        return direction;
    }

    public void setDirection(String direction) {
        this.direction = direction;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public int getTradeTypeId() {
        return tradeTypeId;
    }

    public void setTradeTypeId(int tradeTypeId) {
        this.tradeTypeId = tradeTypeId;
    }

    public Date getTradeDate() {
        return tradeDate;
    }

    public Float getQuoteCurrency() {
        return quoteCurrency;
    }

    public void setQuoteCurrency(Float quoteCurrency) {
        this.quoteCurrency = quoteCurrency;
    }

    public void setTradeDate(Date tradeDate) {
        this.tradeDate = tradeDate;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getModifiedAt() {
        return modifiedAt;
    }

    public void setModifiedAt(Date modifiedAt) {
        this.modifiedAt = modifiedAt;
    }

    public Date getCancelledAt() {
        return cancelledAt;
    }

    public void setCancelledAt(Date cancelledAt) {
        this.cancelledAt = cancelledAt;
    }

    public Date getDeletedAt() {
        return deletedAt;
    }

    public void setDeletedAt(Date deletedAt) {
        this.deletedAt = deletedAt;
    }

    public Date getValueDate() {
        return valueDate;
    }

    public void setValueDate(Date valueDate) {
        this.valueDate = valueDate;
    }

    @Override
    public String toString() {
        return "Orders{" +
                "orderId=" + orderId +
                ", clientId=" + clientId +
                ", ccyId=" + ccyId +
                ", baseNotional=" + baseNotional +
                ", direction='" + direction + '\'' +
                ", price=" + price +
                ", tradeTypeId=" + tradeTypeId +
                ", tradeDate=" + tradeDate +
                ", createdAt=" + createdAt +
                ", modifiedAt=" + modifiedAt +
                ", cancelledAt=" + cancelledAt +
                ", deletedAt=" + deletedAt +
                ", valueDate=" + valueDate +
                '}';
    }
}

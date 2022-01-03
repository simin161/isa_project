package com.fishyfinds.isa.mappers;

import com.fishyfinds.isa.model.beans.AccountDeletionRequest;

import java.util.Map;

public class DtoToAccountDeletionRequest {

    public static AccountDeletionRequest MapToDeleteRequest(Map<String, String> map){
        return new AccountDeletionRequest(Long.valueOf(map.get("id")), map.get("explanation"));
    }
}

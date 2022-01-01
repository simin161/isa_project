package com.fishyfinds.isa.mappers;

import com.fishyfinds.isa.model.beans.DeleteRequest;

import java.util.Map;

public class DtoToDeleteRequest {

    public static DeleteRequest MapToDeleteRequest(Map<String, String> map){
        return new DeleteRequest(Long.valueOf(map.get("id")), map.get("explanation"));
    }
}

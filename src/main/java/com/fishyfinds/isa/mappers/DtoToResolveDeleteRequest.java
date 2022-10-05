package com.fishyfinds.isa.mappers;

import com.fishyfinds.isa.model.beans.ResolveDeletionRequest;

import java.util.Map;

public class DtoToResolveDeleteRequest {

    public static ResolveDeletionRequest MapToResolveRequest(Map<String, String> map){

        return new ResolveDeletionRequest(Long.valueOf(map.get("requestId")), Long.valueOf(map.get("id")), map.get("explanation"));

    }

}

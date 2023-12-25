package com.projet.backend.user;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class CustomAuthoritiesDeserializer extends JsonDeserializer<Collection<? extends GrantedAuthority>> {

    @Override
    public Collection<? extends GrantedAuthority> deserialize(JsonParser jsonParser, DeserializationContext deserializationContext)
            throws IOException, JsonProcessingException {
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        // Deserialize the JSON array into a list of SimpleGrantedAuthority objects
        // Adjust the deserialization logic based on your JSON structure if needed
        JsonNode jsonNode = jsonParser.getCodec().readTree(jsonParser);
        if (jsonNode.isArray()) {
            for (JsonNode node : jsonNode) {
                authorities.add(new SimpleGrantedAuthority(node.asText()));
            }
        }
        return authorities;
    }
}

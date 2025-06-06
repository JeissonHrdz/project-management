package org.projectmanagement.service;

import io.jsonwebtoken.Claims;
import org.springframework.security.core.userdetails.UserDetails;

import java.security.Key;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

public interface JwtService {

    public String getToken(UserDetails user, String user_id);
    public Key getKey();
    public String getToken(Map<String, Object> extraClaims, UserDetails user, String user_id);
    public String getUserNameFromToken(String token);
    public Claims getAllClaims(String token);
    public <T> T getClaim(String token, Function<Claims, T> claimsResolver);
    public Date getExpirationDate(String token);
    public boolean isTokenExpired(String token);
    public boolean isTokenValid(String token, UserDetails userDetails);
 }

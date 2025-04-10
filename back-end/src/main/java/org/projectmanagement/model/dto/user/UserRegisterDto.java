package org.projectmanagement.model.dto.user;

import lombok.Data;

public record UserRegisterDto (
      String username,
      String email,
      String password,
      String firstName,
      String lastName
){}


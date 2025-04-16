package org.projectmanagement.service;

import org.projectmanagement.model.entity.User;

public interface  RoleService {
    public boolean hasPermission(User user, String module, String action);


}

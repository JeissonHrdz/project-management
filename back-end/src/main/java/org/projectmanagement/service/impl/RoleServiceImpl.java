package org.projectmanagement.service.impl;

import org.projectmanagement.model.entity.Role;
import org.projectmanagement.model.entity.User;
import org.projectmanagement.service.RoleService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleServiceImpl implements RoleService {
    @Override
    public boolean hasPermission(User user, String module, String action) {
        return Optional.ofNullable(user.getRole_id())
                .map(Role::getPermissions)
                .map(permissions -> permissions.get(module))
                .map(modulePermissions -> modulePermissions.getOrDefault(action, false))
                .orElse(false);
    }
}

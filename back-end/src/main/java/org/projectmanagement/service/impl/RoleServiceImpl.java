package org.projectmanagement.service.impl;

import lombok.RequiredArgsConstructor;
import org.projectmanagement.model.entity.Role;
import org.projectmanagement.model.entity.User;
import org.projectmanagement.repository.RoleRepository;
import org.projectmanagement.service.RoleService;
import org.projectmanagement.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;
    private final Map<Integer, Role> roleCache = new ConcurrentHashMap<>();
    private final UserService userService;

    @Override
    public void refreshPermissionsCache() {
        roleRepository.findAll().forEach(role -> roleCache.put(role.getRole_id(), role) );
    }

    @Override
    public boolean hasPermission(String module, String action) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findUser(authentication.getName());
        return Optional.ofNullable(user.getRole_id())
                .map(Role::getPermissions)
                .map(permissions -> permissions.get(module))
                .map(modulePermissions -> modulePermissions.getOrDefault(action, false))
                .orElse(false);
    }
}

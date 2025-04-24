package org.projectmanagement.service;

import org.projectmanagement.model.entity.User;

public interface  RoleService {

    public void refreshPermissionsCache();
    public boolean hasPermission(String module, String action);


}

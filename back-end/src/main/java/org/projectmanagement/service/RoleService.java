package org.projectmanagement.service;


public interface  RoleService {

    public void refreshPermissionsCache();
    public boolean hasPermission(String module, String action);


}

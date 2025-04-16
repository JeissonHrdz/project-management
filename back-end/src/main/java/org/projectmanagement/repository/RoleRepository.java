package org.projectmanagement.repository;

import org.projectmanagement.model.entity.Role;
import org.springframework.data.repository.CrudRepository;

public interface RoleRepository extends CrudRepository<Role, Integer> {
}

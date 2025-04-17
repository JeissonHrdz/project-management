package org.projectmanagement.repository;

import org.projectmanagement.model.entity.Project;
import org.springframework.data.repository.CrudRepository;

public interface ProjectRepository extends CrudRepository<Project, Integer> {

}


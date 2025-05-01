package org.projectmanagement.repository;

import org.projectmanagement.model.entity.Backlog;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BacklogRepository extends CrudRepository<Backlog, Integer> {
}

package org.projectmanagement.repository;

import org.projectmanagement.model.entity.TaskAssignments;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskAssignmentRepository  extends CrudRepository<TaskAssignments, Integer> {
}

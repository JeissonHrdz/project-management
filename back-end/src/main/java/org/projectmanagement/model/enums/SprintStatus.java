package org.projectmanagement.model.enums;

public enum SprintStatus {
    planned("planned"),
    in_progress("in_progress"),
    completed("completed");

    private final String displayName;

    SprintStatus(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}


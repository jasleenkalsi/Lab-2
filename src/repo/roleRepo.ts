
export type Role = {
  role: string;
  department: string;
  description: string;
};

export const roleRepo = {
  create(current: Role[], draft: Role): Role[] {
    return [...current, { ...draft }];
  },
};

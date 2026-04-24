import AdminLayout from "@/components/admin/AdminLayout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { set, z } from "zod";
import {
  Eye,
  Pencil,
  Plus,
  Loader2,
  Shield,
  Mail,
  User2,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { de } from "zod/v4/locales";
import { DeleteConfirmDialog } from "@/components/DeleteConfirmDialog";
import { getImageUrl } from "@/api/config";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().optional(),
  role: z.string().min(1),
  profileImage: z.any().optional(),
});

type FormValues = z.infer<typeof schema>;

type UserType = {
  id: number;
  name: string;
  email: string;
  role: string;
  profileImage?: string;
};

const UserManagement = () => {
  const queryClient = useQueryClient();

  const [openAdd, setOpenAdd] = useState(false);
  const [viewUser, setViewUser] = useState<UserType | null>(null);
  const [editUser, setEditUser] = useState<UserType | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["user-management", debouncedSearch],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/auth/all-users?search=${encodeURIComponent(debouncedSearch)}`,
        { withCredentials: true },
      );
      return res.data;
    },
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  const addForm = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "",
      profileImage: editUser?.profileImage || "",
    },
  });

  const editForm = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "",
      profileImage: editUser?.profileImage || "",
    },
  });

  const uploadImage = async (file: File) => {
    const fd = new FormData();
    fd.append("image", file);

    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/upload`,
      fd,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      },
    );

    console.log(res.data);

    return res.data;
  };

  const addMutation = useMutation({
    mutationFn: async (values: FormValues) => {
      let imageUrl = values.profileImage as any;

      if (values.profileImage instanceof File) {
        imageUrl = await uploadImage(values.profileImage);
      }

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/add-user`,
        {
          name: values.name,
          email: values.email,
          password: values.password,
          role: values.role,
          profileImage: imageUrl,
        },
        { withCredentials: true },
      );
      return data;
    },
    onSuccess: (data) => {
      console.log("success", data);
      toast.success(data.data?.message || "User created");
      queryClient.invalidateQueries({ queryKey: ["user-management"] });
      addForm.reset();
      setOpenAdd(false);
    },
    onError: (error) => {
      console.log("error", error);
      toast.error(error?.message || "Failed to create user");
    },
  });

  const editMutation = useMutation({
    mutationFn: async (values: FormValues) => {
      let imageUrl = values.profileImage as any;

      if (values.profileImage instanceof File) {
        imageUrl = await uploadImage(values.profileImage);
      }

      if (!values.profileImage) {
        imageUrl = editUser?.profileImage || "";
      }

      const data = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/auth/update-user/${editUser?.id}`,
        {
          name: values.name,
          email: values.email,
          password: values.password,
          role: values.role,
          profileImage: imageUrl,
        },
        { withCredentials: true },
      );
      return data;
    },
    onSuccess: (data) => {
      console.log("edit success", data);
      toast.success(data.data?.message || "User updated");
      queryClient.invalidateQueries({ queryKey: ["user-management"] });
      setEditUser(null);
    },
    onError: (error) => {
      console.log("edit error", error);
      toast.error(error?.message || "Failed to update user");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/auth/delete-user/${id}`,
        { withCredentials: true },
      );
      return data;
    },
    onSuccess: (data) => {
      console.log("delete success", data);
      queryClient.invalidateQueries({ queryKey: ["user-management"] });
      toast.success(data.data?.message || "User deleted");
      setDeleteId(null);
      setOpenDelete(false);
    },
    onError: (error) => {
      console.log("delete error", error);
      toast.error(error?.message || "Failed to delete user");
    },
  });

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteMutation.mutateAsync(deleteId);
  };

  const users = data?.users || [];

  return (
    <AdminLayout>
      <div className="space-y-6 p-4 md:p-6 font-sans">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              User Management
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage admin users and permissions
            </p>
          </div>

          <Dialog open={openAdd} onOpenChange={setOpenAdd}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg font-sans">
              <DialogHeader>
                <DialogTitle>Add User</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                Create a new admin user by filling out the form below.
              </DialogDescription>

              <Form {...addForm}>
                <form
                  onSubmit={addForm.handleSubmit((values) =>
                    addMutation.mutate(values),
                  )}
                  className="space-y-4"
                >
                  <FormField
                    control={addForm.control}
                    name="profileImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profile Image</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              field.onChange(e.target.files?.[0])
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={addForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={addForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={addForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={addForm.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="editor">Editor</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <DialogFooter>
                    <Button
                      type="submit"
                      disabled={addMutation.isPending}
                      className="w-full"
                    >
                      {addMutation.isPending && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Save User
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardContent className="p-2">
            <Input
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <div className="flex items-center justify-center py-10">
                        <Loader2 className="h-6 w-6 animate-spin" />
                      </div>
                    </TableCell>
                  </TableRow>
                ) : users.length > 0 ? (
                  users.map((user: UserType, idx: number) => (
                    <TableRow key={user.id || idx}>
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell className="capitalize">{user.role}</TableCell>

                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => setViewUser(user)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>

                          <Button
                            size="icon"
                            onClick={() => {
                              setEditUser(user);
                              editForm.reset({
                                name: user.name,
                                email: user.email,
                                password: "",
                                role: user.role,
                                profileImage: user.profileImage || "",
                              });
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            onClick={() => {
                              setDeleteId(user.id);
                              setOpenDelete(true);
                            }}
                            variant="destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <div className="py-10 text-center text-sm text-muted-foreground">
                        No users found
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Dialog open={!!viewUser} onOpenChange={() => setViewUser(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>User Details</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              View detailed information about the user.
            </DialogDescription>

            <div className="space-y-4">
              <div className="mx-auto flex flex-col items-center gap-3">
                {viewUser?.profileImage ? (
                  <img
                    src={getImageUrl(viewUser.profileImage)}
                    alt={viewUser.name}
                    className="h-20 w-20 rounded-3xl object-cover border"
                  />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-black text-2xl font-semibold text-white">
                    {viewUser?.name?.charAt(0)}
                  </div>
                )}
              </div>

              <div className="space-y-3 rounded-xl border p-4">
                <div className="flex items-center gap-3">
                  <User2 className="h-4 w-4" />
                  <span>{viewUser?.name}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4" />
                  <span>{viewUser?.email}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Shield className="h-4 w-4" />
                  <span className="capitalize">{viewUser?.role}</span>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={!!editUser} onOpenChange={() => setEditUser(null)}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              Update user information and permissions.
            </DialogDescription>

            <Form {...editForm}>
              <form
                onSubmit={editForm.handleSubmit((values) =>
                  editMutation.mutate(values),
                )}
                className="space-y-4 font-sans"
              >
                <FormField
                  control={editForm.control}
                  name="profileImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profile Image</FormLabel>
                      <FormControl>
                        <div className="space-y-3">
                          {(field.value || editUser?.profileImage) && (
                            <img
                              src={
                                field.value instanceof File
                                  ? URL.createObjectURL(field.value)
                                  : getImageUrl(field.value) ||
                                    getImageUrl(editUser?.profileImage)
                              }
                              alt="Preview"
                              className="h-20 w-20 rounded-xl object-cover border"
                            />
                          )}

                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              field.onChange(e.target.files?.[0])
                            }
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={editForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={editForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Leave blank to keep same"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={editForm.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="editor">Editor</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button
                    type="submit"
                    disabled={editMutation.isPending}
                    className="w-full"
                  >
                    {editMutation.isPending && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Update User
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <DeleteConfirmDialog
        open={openDelete}
        title="Delete User"
        description="Are you sure you want to delete this user? This action cannot be undone."
        onConfirm={handleDelete}
        onOpenChange={setOpenDelete}
        buttonTxt="Delete"
      />
    </AdminLayout>
  );
};

export default UserManagement;

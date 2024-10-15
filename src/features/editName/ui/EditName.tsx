import { Button } from '@/shared/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/shared/components/ui/dialog';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import React, { useState } from 'react';
import { Edit } from 'lucide-react';
import { useAuthStore } from '@/shared/stores/auth/useAuthStore';
import { EditNameProps } from '@/features/editName/model/type';

export const EditName: React.FC<EditNameProps> = ({ mutate }) => {
    const { user } = useAuthStore();

    const [name, setName] = useState(user!.nickname);

    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const onOpenChange = (open: boolean) => {
        if (open && user) {
            setName(user.nickname);
        }
    };

    return (
        <Dialog onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Edit size="20px" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>닉네임 변경</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            닉네임
                        </Label>
                        <Input id="name" value={name} className="col-span-3" onChange={onChangeName} />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        type="submit"
                        onClick={() => {
                            if (user) {
                                mutate({ user, newName: name });
                            }
                        }}
                    >
                        변경하기
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

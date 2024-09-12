import React, { useState } from 'react';
import DaumPostcode, { Address } from 'react-daum-postcode';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormMessage } from '@/shared/components/ui/form';

export const AddressForm: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { setValue, control } = useFormContext();

    const handleComplete = (data: Address) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }

        setValue('postalCode', data.zonecode);
        setValue('streetAddress', fullAddress);
        setIsModalOpen(false);
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-2">
                <FormField
                    control={control}
                    name="postalCode"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormControl>
                                <Input placeholder="우편번호" readOnly {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(true)}>
                    주소 찾기
                </Button>
            </div>

            <FormField
                control={control}
                name="streetAddress"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input placeholder="주소" readOnly {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {isModalOpen && (
                <div>
                    <DaumPostcode onComplete={handleComplete} />
                    <Button onClick={() => setIsModalOpen(false)}>닫기</Button>
                </div>
            )}
        </div>
    );
};

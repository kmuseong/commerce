import React, { useRef, useState } from 'react';
import classes from './CreateProductForm.module.css';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/shared/components/ui/select';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Textarea } from '@/shared/components/ui/textarea';
import { useAuthStore } from '@/shared/stores/auth/useAuthStore';
import { useMutation } from '@tanstack/react-query';
import { onAddProduct } from '@/features/createProduct/api/api';
import { schema } from '@/features/createProduct/model/validation';
import { useNavigate } from 'react-router-dom';
import { Image, Trash2 } from 'lucide-react';
import { ProductFormType } from '@/entities/product/type';

export const CreateProductForm: React.FC = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
        trigger,
    } = useForm<ProductFormType>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
            description: '',
            origin: '',
            bean_type: '',
            price: '',
            weight: '',
            stock_quantity: '',
        },
    });
    const [originCheck, setOriginCheck] = useState(false);
    const [beanTypeCheck, setBeanTypeCheck] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    // 이미지 상태 관리
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);

    const navigate = useNavigate();
    const { user } = useAuthStore();

    const { mutate, isPending } = useMutation({
        mutationKey: ['addProduct'],
        mutationFn: onAddProduct,
        onSuccess: (response) => {
            navigate(`/product/${response.id}`);
        },
    });

    const onSubmit = (form: ProductFormType) => {
        const newList = { ...form, user_id: user?.id };
        mutate({ form: newList, images: selectedFiles });
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);

        if (files.length === 0) {
            return;
        }

        // 파일 개수 체크
        if (files.length > 4) {
            alert('You can only select up to 4 images.');
            return;
        }

        // 선택된 파일을 상태로 설정 (기존 상태 초기화)
        setSelectedFiles(files);

        // 파일 미리보기 생성
        const newPreviews: string[] = [];
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                newPreviews.push(reader.result as string);
                // 모든 파일의 미리보기가 생성되면 상태 업데이트
                if (newPreviews.length === files.length) {
                    setPreviews(newPreviews);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const handleRemoveImage = (index: number) => {
        setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
        setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));

        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    if (isPending) {
        return <div>로딩중...</div>;
    }

    return (
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={classes.select}>
                <div>
                    {originCheck ? (
                        <Input
                            {...register('bean_type')}
                            type="beanType"
                            placeholder="원두 종류를 입력해주세요."
                            className={errors.bean_type ? classes.inputError : ''}
                            autoComplete="beanType"
                        />
                    ) : (
                        <Controller
                            name="bean_type"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    onValueChange={(value) => {
                                        field.onChange(value);
                                        trigger('bean_type');
                                    }}
                                >
                                    <SelectTrigger className={errors.bean_type ? classes.inputError : ''}>
                                        <SelectValue placeholder="원두 선택" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>원두를 선택해주세요.</SelectLabel>
                                            <SelectItem value="arabica">아라비카(Arabica)</SelectItem>
                                            <SelectItem value="robusta">로부스타(Robusta)</SelectItem>
                                            <SelectItem value="liberica">리베리카(Liberica)</SelectItem>
                                            <SelectItem value="excelsa">엑셀사(Excelsa)</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    )}
                    {errors.bean_type && <p className={classes.error}>{errors.bean_type.message}</p>}
                </div>

                <div className="flex items-center space-x-2">
                    <Checkbox id="beanType" onClick={() => setOriginCheck((prev) => !prev)} />
                    <label
                        htmlFor="beanType"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        직접 입력
                    </label>
                </div>
            </div>

            <div className={classes.select}>
                <div>
                    {beanTypeCheck ? (
                        <Input
                            {...register('origin')}
                            type="origin"
                            placeholder="원산지를 입력해주세요."
                            className={errors.description ? classes.inputError : ''}
                            autoComplete="origin"
                        />
                    ) : (
                        <Controller
                            name="origin"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    onValueChange={(value) => {
                                        field.onChange(value);
                                        trigger('origin');
                                    }}
                                >
                                    <SelectTrigger className={errors.origin ? classes.inputError : ''}>
                                        <SelectValue placeholder="원산지 선택" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>원산지를 선택해주세요.</SelectLabel>
                                            <SelectItem value="ethiopia">에티오피아(Ethiopia)</SelectItem>
                                            <SelectItem value="colombia">콜롬비아(Colombia)</SelectItem>
                                            <SelectItem value="brazil">브라질(Brazil)</SelectItem>
                                            <SelectItem value="indonesia">인도네시아(Indonesia)</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    )}
                    {errors.origin && <p className={classes.error}>{errors.origin.message}</p>}
                </div>

                <div className="flex items-center space-x-2">
                    <Checkbox id="origin" onClick={() => setBeanTypeCheck((prev) => !prev)} />
                    <label
                        htmlFor="origin"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        직접 입력
                    </label>
                </div>
            </div>

            <div>
                <Controller
                    name="weight"
                    control={control}
                    render={({ field }) => (
                        <Select
                            onValueChange={(value) => {
                                field.onChange(value);
                                trigger('weight');
                            }}
                        >
                            <SelectTrigger className={errors.weight ? classes.inputError : ''}>
                                <SelectValue placeholder="무게 선택" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>무게를 선택해주세요.</SelectLabel>
                                    <SelectItem value="200g">200g</SelectItem>
                                    <SelectItem value="500g">500g</SelectItem>
                                    <SelectItem value="1kg">1kg</SelectItem>
                                    <SelectItem value="5kg">5kg</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    )}
                />

                {errors.weight && <p className={classes.error}>{errors.weight.message}</p>}
            </div>

            <div>
                <Input
                    {...register('name')}
                    placeholder="제목"
                    className={errors.name ? classes.inputError : ''}
                    autoComplete="name"
                />
                {errors.name && <p className={classes.error}>{errors.name.message}</p>}
            </div>

            <div>
                <Textarea
                    {...register('description')}
                    placeholder="설명"
                    className={errors.description ? classes.inputError : ''}
                    autoComplete="description"
                />
                {errors.description && <p className={classes.error}>{errors.description.message}</p>}
            </div>

            <div>
                <Input
                    {...register('price')}
                    type="price"
                    placeholder="가격을 설정해주세요."
                    className={errors.price ? classes.inputError : ''}
                    autoComplete="price"
                />
                {errors.price && <p className={classes.error}>{errors.price.message}</p>}
            </div>

            <div>
                <Input
                    {...register('stock_quantity')}
                    type="stock_quantity"
                    placeholder="수량을 설정해주세요."
                    className={errors.stock_quantity ? classes.inputError : ''}
                    autoComplete="stock_quantity"
                />
                {errors.stock_quantity && <p className={classes.error}>{errors.stock_quantity.message}</p>}
            </div>

            <div className={classes.imgList}>
                {previews.length > 0 && (
                    <ul className="flex gap-5">
                        {previews.map((src, index) => (
                            <li key={index} className={classes.selectImg}>
                                <img
                                    src={src}
                                    alt={`Selected file ${index + 1}`}
                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                />
                                <div className={classes.remove}>
                                    <Trash2 onClick={() => handleRemoveImage(index)} />
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="flex w-full items-center gap-3">
                <label htmlFor="picture">
                    <Image />
                </label>
                <input
                    className="hidden"
                    ref={inputRef}
                    id="picture"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                />
                <div>선택한 이미지: {selectedFiles.length}</div>
            </div>

            <Button className={classes.signup} type="submit">
                등록
            </Button>
        </form>
    );
};

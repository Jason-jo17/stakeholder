import React from 'react';

interface BlockData {
    text?: string;
    level?: number;
    style?: string;
    items?: any[];
}

interface Block {
    id: string;
    type: string;
    data: BlockData;
}

interface RichTextProps {
    blocks: Block[];
    className?: string;
}

export const RichTextBlock: React.FC<RichTextProps> = ({ blocks, className = '' }) => {
    if (!blocks || !Array.isArray(blocks)) return null;

    return (
        <div className={`space-y-4 ${className}`}>
            {blocks.map((block) => {
                switch (block.type) {
                    case 'header':
                        const Level = `h${block.data.level || 3}` as keyof JSX.IntrinsicElements;
                        return (
                            <Level key={block.id} className="font-bold text-[#1C2A3B] mt-6 mb-2" dangerouslySetInnerHTML={{ __html: block.data.text || '' }} />
                        );

                    case 'paragraph':
                        return (
                            <p key={block.id} className="text-[#1C2A3B] text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: block.data.text || '' }} />
                        );

                    case 'list':
                        const ListTag = block.data.style === 'ordered' ? 'ol' : 'ul';
                        const listClass = block.data.style === 'ordered' ? 'list-decimal' : 'list-disc';
                        return (
                            <ListTag key={block.id} className={`${listClass} pl-5 space-y-2 marker:text-[#786BF9]`}>
                                {block.data.items?.map((item: any, idx: number) => (
                                    <li key={idx} dangerouslySetInnerHTML={{ __html: typeof item === 'string' ? item : item.content }} />
                                ))}
                            </ListTag>
                        );

                    default:
                        return null;
                }
            })}
        </div>
    );
};

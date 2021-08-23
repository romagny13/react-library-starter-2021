/// <reference types="react" />
import './ComponentA.css';
export interface ComponentAProps {
    message?: string;
}
export default function ComponentA({ message, }: ComponentAProps): JSX.Element;
